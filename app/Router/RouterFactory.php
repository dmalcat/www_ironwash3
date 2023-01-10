<?php

declare(strict_types=1);

namespace FreshBangApp\Router;

use Nette;
use Nette\Application\Routers\RouteList;
use Nette\Http\Request;
use Nette\Routing\Router;


final class RouterFactory
{
	use Nette\StaticClass;

	/** @var string */
	public const    LOCAL_DEV = 'local_dev',
		DEV_STAGE = 'dev_stage',
		LIVE      = 'live';

	/** @var string[]  */
	public const    REGIONS = [ 'cz', 'en' ];


	/**
	 * @param Request $request
	 * @param string  $basePath
	 * @return RouteList
	 */
	public static function createRouter(Request $request, $basePath = ''): RouteList
	{
		$router = new RouteList;

		$router->addRoute('', [
            'presenter' 	=> 'Homepage',
            'action' 		=> 'default',
            'region' 		=> 'cz'
        ], Router::ONE_WAY);

		$router->addRoute('<region cz|en>', [
            'presenter' 	=> 'Homepage',
            'action' 		=> 'default',
            'region' 		=> null
        ]);

		$router->addRoute('cz/nase-sluzby', [
            'presenter' 	=> 'Services',
            'action' 		=> 'default',
            'region' 		=> 'cz'
        ]);

		$router->addRoute('en/our-services', [
            'presenter' 	=> 'Services',
            'action' 		=> 'default',
            'region' 		=> 'en'
        ]);

		return $router;
	}


	/**
	 * @param Request $request
	 * @return string
	 */
	private static function estimateEnvironment(Request $request): string
	{
		static $hostPatterns = [
			'localhost'                    => self::LOCAL_DEV,
			'domain-name\.freshdev80\.cz'  => self::DEV_STAGE,
			'www\.domain-name\.cz'         => self::LIVE,
			'www\.domain-name\.sk'         => self::LIVE
		];

		$host = $request->getUrl()->getHost();

		foreach ($hostPatterns as $pattern => $env) {
			if (Nette\Utils\Strings::match($host, "~^$pattern$~")) {
				return $env;
			}
		}

		return self::LOCAL_DEV;
	}
}
